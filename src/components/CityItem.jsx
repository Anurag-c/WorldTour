import { useCities } from "./CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity } = useCities();

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  return (
    <Link
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles["cityItem--active"] : ""
      }`}
    >
      <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  );
}

export default CityItem;
