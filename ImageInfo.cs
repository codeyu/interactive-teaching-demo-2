using System;
namespace interactive_teaching_demo_2
{
    public class ImageInfo
    {
        public string Uuid { get; set; }
        public DateTime Date { get; set; }

        public string Name { get; set; }

        public string Group => Name.Substring(0, 3);

        public int ImageIndex => Convert.ToInt32(Name.Split(".")[0].Substring(3, 1));
    }
}
