import PropTypes from "prop-types";

const WeatherForm = ({ onCityChange }) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value.trim();
        if (city) {
            onCityChange(city);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-4">
            <input
                type="text"
                name="city"
                placeholder="Enter city name"
                className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Get Weather
            </button>
        </form>
    );
};

WeatherForm.propTypes = {
    onCityChange: PropTypes.func,
};

export default WeatherForm;
