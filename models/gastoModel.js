import express from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const __dirname = import.meta.dirname;

const all = async () => {
  try {
    const file = await readFile(path.join(__dirname, "../data/gastos.json"));
    const jsonData = JSON.parse(file);

    if (!jsonData) {
      throw { msg: "No se pudo parsear el archivo!" };
    }

    return jsonData;
  } catch (error) {
    throw { error };
  }
};

const one = async (id) => {
  try {
    const file = await readFile(path.join(__dirname, "../data/gastos.json"));
    const jsonData = JSON.parse(file);
    const gasto = jsonData.find((e) => parseInt(e.id) === id);

    if (!gasto) {
      throw { msg: "No se pudo encontrar el gasto!" };
    }

    return gasto;
  } catch (error) {
    throw { error };
  }
};

const create = async ({ roommate_id, comment, amount }) => {
  try {
    const gastosFile = await readFile(
      path.join(__dirname, "../data/gastos.json")
    );
    const gastosData = JSON.parse(gastosFile);

    const roommatefile = await readFile(
      path.join(__dirname, "../data/roommates.json")
    );
    const roommateData = JSON.parse(roommatefile);

    roommateData.forEach((e) => {
      if (e.id === roommate_id) {
        Object.assign(e, { debit: parseInt(e.debit) + parseInt(amount) });
      }
    });

    const gasto = { id: gastosData.length, roommate_id, comment, amount };
    console.log(gasto);
    gastosData.push(gasto);

    await writeFile(
      path.join(__dirname, "../data/gastos.json"),
      JSON.stringify(gastosData)
    );
    await writeFile(
      path.join(__dirname, "../data/roommates.json"),
      JSON.stringify(roommateData)
    );

    return gastosData[gastosData.length - 1];
  } catch (error) {
    throw { error };
  }
};

const update = async (id, { roommate_id, comment, amount }) => {
  try {
    const gastosFile = await readFile(
      path.join(__dirname, "../data/gastos.json")
    );
    const gastosData = JSON.parse(gastosFile);

    const roommatefile = await readFile(
      path.join(__dirname, "../data/roommates.json")
    );
    const roommateData = JSON.parse(roommatefile);

    let old_amount = 0;
    let old_roommate = "";
    let roommate_changed = false;

    gastosData.forEach((e) => {
      if (parseInt(e.id) === parseInt(id)) {
        if (e.roommate_id != roommate_id) {
          old_roommate = e.roommate_id;
          roommate_changed = true;
        }

        old_amount = e.amount;
        Object.assign(e, { roommate_id, comment, amount });
      }
    });

    roommateData.forEach((e) => {
      if (
        e.roommate_id === old_roommate ||
        (!roommate_changed && e.roommate_id === roommate_id)
      ) {
        Object.assign(e, { debit: parseInt(e.debit) - parseInt(old_amount) });
      }
      if (e.id === roommate_id) {
        Object.assign(e, { debit: parseInt(e.debit) + parseInt(amount) });
      }
    });

    await writeFile(
      path.join(__dirname, "../data/gastos.json"),
      JSON.stringify(gastosData)
    );
    await writeFile(
      path.join(__dirname, "../data/roommates.json"),
      JSON.stringify(roommateData)
    );

    return gastosData[gastosData.length - 1];
  } catch (error) {
    throw { error };
  }
};

const remove = async (id) => {
  try {
    const gastosFile = await readFile(
      path.join(__dirname, "../data/gastos.json")
    );
    const gastosData = JSON.parse(gastosFile);

    const roommatefile = await readFile(
      path.join(__dirname, "../data/roommates.json")
    );
    const roommateData = JSON.parse(roommatefile);

    const index = gastosData.findIndex((e) => parseInt(e.id) === parseInt(id));
    if (index === -1) {
      throw { msg: "No se encontro el gasto!" };
    }

    roommateData.forEach((e) => {
      if (e.id === gastosData[index].roommate_id) {
        Object.assign(e, {
          debit: parseInt(e.debit) - parseInt(gastosData[index].amount),
        });
      }
    });
    gastosData.splice(index, 1);
    await writeFile(
      path.join(__dirname, "../data/gastos.json"),
      JSON.stringify(gastosData)
    );
    await writeFile(
      path.join(__dirname, "../data/roommates.json"),
      JSON.stringify(roommateData)
    );
    return gastosData[gastosData.length - 1];
  } catch (error) {
    throw { error };
  }
};

export const GastoModel = {
  all,
  one,
  create,
  update,
  remove,
};
