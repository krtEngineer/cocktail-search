import axios from "axios";
import { useLoaderData, Navigate, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailPage";

const singleCocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php`;

const getCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(singleCocktailUrl, {
        params: {
          i: id,
        },
      });
      return data;
    },
  };
};

export const loader = (queryClient) => {
  return async ({ params }) => {
    const { id } = params;
    const data = await queryClient.ensureQueryData(getCocktailQuery(id));
    return { data, id };
  };
};

const Cocktail = () => {
  const { id, data } = useLoaderData();
  const navigate = useNavigate();
  if (!data) {
    return <Navigate to="/" />;
  }
  const drink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = drink;
  const validIngredients = Object.keys(drink)
    .filter((key) => key.startsWith("strIngredient") && drink[key] !== null)
    .map((key) => drink[key]);
  return (
    <Wrapper>
      <header>
        <button
          className="btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          back home
        </button>
        <h3>ID: {id}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
