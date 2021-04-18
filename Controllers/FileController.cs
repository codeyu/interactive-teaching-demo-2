using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace interactive_teaching_demo_2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment hostingEnvironment;
        private LiteDatabase _liteDb;
        public FileController(IWebHostEnvironment environment, ILiteDbContext liteDbContext)
        {
            hostingEnvironment = environment;
            _liteDb = liteDbContext.Database;
        }

        [HttpGet]
        public IEnumerable<ImageInfo> Get()
        {
            var result = _liteDb.GetCollection<ImageInfo>("ImageInfo")
                .FindAll();
            return result;
        }
        [HttpGet]
        [Route("[action]")]
        public IEnumerable<ImageScore> GetScore()
        {
            var result = _liteDb.GetCollection<ImageScore>("ImageScore")
                .FindAll();
            return result;
        }
        [HttpPost]
        [Route("[action]")]
        public IActionResult SaveScore( [FromBody]List<ImageScore> imageScores)
        {
            if(imageScores.Count > 0)
            {
                System.Console.WriteLine(imageScores[0].ImageName);
            }
            
            var now = DateTime.Now;
            foreach (var sc in imageScores)
            {
                sc.Date = now;
                _liteDb.GetCollection<ImageScore>("ImageScore")
                .Insert(sc);
                
            }
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> UploadAsync(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            foreach (var formFile in files)
            {
                
                if (formFile.Length > 0)
                {
                    var img = new ImageInfo();
                    var uniqueFileName = GetUniqueFileName(formFile.FileName);
                    var uploads = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
                    var filePath = Path.Combine(uploads,uniqueFileName);
                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                    img.Name = uniqueFileName;
                    img.Date = DateTime.Now;
                    img.Uuid = "";
                    _liteDb.GetCollection<ImageInfo>("ImageInfo")
                    .Insert(img);
                }
            }

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { count = files.Count, size });
        }

        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                      + "_"
                      + new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds()
                      + Path.GetExtension(fileName);
        }
    }
}