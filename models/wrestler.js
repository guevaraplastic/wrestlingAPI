import { randomUUID } from "node:crypto";
import { readJSON } from "../utils.js";

const wrestlers = readJSON("./DB/wrestlers.json");

export class WrestlerModel {
  static async getAll({ currentCompany }) {
    if (currentCompany) {
      return wrestlers.filter((element) =>
        element.currentCompany.includes(currentCompany)
      );
    }
    return wrestlers;
  }

  static async getById({ id }) {
    // Find the ID of the wrestler
    const wrestler = wrestlers.find((element) => element.id === id);
    // If existen return the wrestler info
    return wrestler;
  }

  static async create(input) {
    const newWrestler = {
      id: randomUUID(),
      // If validation is correct we can pass the info
      ...input,
    };

    wrestlers.push(newWrestler);
    return newWrestler;
  }

  static async delete({ id }) {
    const wrestlerIndex = wrestlers.findIndex((element) => element.id === id);

    if (wrestlerIndex === -1) return false;

    wrestlers.splice(wrestlerIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const wrestlerIndex = wrestlers.findIndex((element) => element.id === id);

    // Flag in case wrestler does not exist
    if (wrestlerIndex === -1) return false;

    wrestlers[wrestlerIndex] = {
      ...wrestlers[wrestlerIndex],
      ...input,
    };

    return wrestlers[wrestlerIndex];
  }
}
