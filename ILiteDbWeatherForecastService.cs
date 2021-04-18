using System.Collections.Generic;

namespace interactive_teaching_demo_2
{
    public interface ILiteDbWeatherForecastService
    {
        int Delete(int id);
        IEnumerable<WeatherForecast> FindAll();
        WeatherForecast FindOne(int id);
        int Insert(WeatherForecast forecast);
        bool Update(WeatherForecast forecast);
    }
}