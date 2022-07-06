import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchCharacters } from "../pokemon.slice";

const Character = () => {
  const characters = useAppSelector((state) => state.pokemon.characters);
  const dispatch = useAppDispatch();

  console.log("characters :>> ", characters);
  useEffect(() => {
    const fetchCharactersThunk = async () => {
      await dispatch(fetchCharacters());
    };

    fetchCharactersThunk();
  }, [dispatch]);
  return <div>Character</div>;
};

export default Character;
