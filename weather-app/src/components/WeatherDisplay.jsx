import PropTypes from "prop-types";

const WeatherDisplay = ({ weather }) => {
    if (!weather) return null;

    const { name, main, weather: weatherDetails } = weather;
    const [details] = weatherDetails;

    return (
        <div className="mt-8 text-center">
            <h2 className="text-3xl font-semibold">{name}</h2>
            <p className="text-xl">{details.description}</p>
            <p className="text-2xl mt-4">{Math.round(main.temp)}°{main.temp ? (main.temp >= 32 ? 'F' : 'C') : ''}</p> 
        </div>
    );
};

WeatherDisplay.propTypes = {
    weather: PropTypes.object,
    unit: PropTypes.string,
};

export default WeatherDisplay;
