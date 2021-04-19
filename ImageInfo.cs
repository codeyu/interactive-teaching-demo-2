using System;
namespace interactive_teaching_demo_2
{
    public class ImageInfo
    {
        public string Uuid { get; set; }
        public DateTime Date { get; set; }

        public string Name { get; set; }

        public string Group => Name.Split("-")[0];

        public int ImageIndex {get; set;}
    }
}
