import { WrestlerModel } from "../models/wrestler.js";
import {
  validatePartialWrestler,
  validateWrestler,
} from "../schemas/wrestlers.js";

export class WrestlerController {
  static async getAll(req, res) {
    const { currentCompany } = req.query;

    const wrestlers = await WrestlerModel.getAll({ currentCompany });
    res.json(wrestlers);
  }

  static async getById(req, res) {
    // Get ID from params
    const { id } = req.params;
    const wrestler = await WrestlerModel.getById({ id });
    // If existen return the wrestler info
    if (wrestler) return res.json(wrestler);
    // If not, return a status
    res.status(404).json({ message: "Wrestler not found" });
  }

  static async create(req, res) {
    // Use Schema validation
    const result = validateWrestler(req.body);
    // Flag for validations
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    }

    const newWrestler = await WrestlerModel.create(result.data);

    res.status(201).json(newWrestler);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const result = await WrestlerModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Wrestler no found" });
    }

    return res.json({ message: "Wrestler deleted" });
  }

  static async update(req, res) {
    // Validate data
    const result = validatePartialWrestler(req.body);

    // Flag for validate data
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }

    const { id } = req.params;

    const updatedWrestler = await WrestlerModel.update({
      id,
      input: result.data,
    });

    return res.json(updatedWrestler);
  }
}
