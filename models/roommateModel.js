import { readFile, writeFile } from "fs/promises";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const __dirname = import.meta.dirname;

const all = async () => {
  try {
    const file = await readFile(path.join(__dirname, "../data/roommates.json"));
    const jsonData = JSON.parse(file);
    return jsonData;
  } catch (error) {
    throw { error };
  }
};

const one = async (id) => {
  try {
    const file = await readFile(path.join(__dirname, "../data/roommates.json"));
    const jsonData = JSON.parse(file);
    const roommate = jsonData.find((e) => e.id === id);
    if (!roommate) {
      throw { msg: "No se pudo encontrar el roommate!" };
    }
    return roommate;
  } catch (error) {
    throw { error };
  }
};

const create = async () => {
  try {
    const file = await readFile(path.join(__dirname, "../data/roommates.json"));
    const jsonData = JSON.parse(file);

    const { data } = await axios.get("https://randomuser.me/api");

    if (!data) {
      throw { msg: "No se pudo obtener datos!" };
    }
    jsonData.push({
      id: uuidv4(),
      name: data.results[0].name.first + " " + data.results[0].name.last,
      debit: 0,
      income: 9999,
    });

    await writeFile(
      path.join(__dirname, "../data/roommates.json"),
      JSON.stringify(jsonData)
    );

    return jsonData[jsonData.length - 1];
  } catch (error) {
    throw { error };
  }
};

export const RoommateModel = {
  all,
  one,
  create,
};
