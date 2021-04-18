using System;
using System.Collections.Generic;

namespace interactive_teaching_demo_2
{
    public class ImageScores
    {
        public List<ImageScore>  Imgs {get;set;}
    }
    public class ImageScore
    {
        public string Uuid { get; set; }
        public DateTime Date { get; set; }
        public int Score {get;set;}
        public string ImageName { get; set; }
    }
}