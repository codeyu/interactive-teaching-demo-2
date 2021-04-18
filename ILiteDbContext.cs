using LiteDB;
namespace interactive_teaching_demo_2
{
    public interface ILiteDbContext
    {
        LiteDatabase Database { get; }
    }
}