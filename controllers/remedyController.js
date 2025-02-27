import Remedy from '../model/Remedy.js';

// Get all remedies
const getAllRemedies = async (req, res) => {
  try {
    const remedies = await Remedy.findAll();
    res.json(remedies);
  } catch (error) {
    console.error("Error fetching remedies:", error);
    res.status(500).json({ error: 'Failed to fetch remedies' });
  }
};

// Add a new remedy
const addRemedy = async (req, res) => {
  // Change 'instruction' to 'procedure' to match the model
  const { title, description, procedure, categoryId } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Create the remedy; note that if categoryId is not provided, the model default will be used.
    const newRemedy = await Remedy.create({ 
      title, 
      description, 
      procedure, 
      categoryId, 
      image 
    });
    res.status(201).json(newRemedy);
  } catch (error) {
    console.error("Error adding remedy:", error);
    res.status(500).json({ error: 'Failed to add remedyy', details: error.message });
  }
};

// Update a remedy
const updateRemedy = async (req, res) => {
  const { id } = req.params;
  const { title, description, procedure, categoryId } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log(`🛠 Updating remedy ID: ${id}`);
  console.log("Received Data:", { title, description, procedure, categoryId, image });

  try {
    const remedy = await Remedy.findByPk(id);
    if (!remedy) {
      console.log(" Remedy not found!");
      return res.status(404).json({ error: "Remedy not found" });
    }

    remedy.title = title || remedy.title;
    remedy.description = description || remedy.description;
    remedy.procedure = procedure || remedy.procedure;
    remedy.categoryId = categoryId || remedy.categoryId;
    remedy.image = image || remedy.image;

    await remedy.save();
    console.log("Remedy updated successfully!");
    res.json(remedy);
  } catch (error) {
    console.error(" Error updating remedy:", error);
    res.status(500).json({ error: "Failed to update remedy", details: error.message });
  }
};

// Delete a remedy
const deleteRemedy = async (req, res) => {
  const { id } = req.params;
  console.log(` Attempting to delete remedy with ID: ${id}`);

  try {
    const remedy = await Remedy.findByPk(id);
    
    if (!remedy) {
      console.log(" Remedy not found in DB!");
      return res.status(404).json({ error: "Remedy not found" });
    }

    await remedy.destroy();
    console.log("Remedy deleted successfully");
    return res.json({ message: "Remedy deleted successfully" });
  } catch (error) {
    console.error(" Error in deleteRemedy:", error);
    return res.status(500).json({ error: "Failed to delete remedy", details: error.message });
  }
};
const getRemedyById = async (req, res) => {
  const { id } = req.params;

  try {
    const remedy = await Remedy.findByPk(id);
    if (!remedy) {
      return res.status(404).json({ error: "Remedy not found" });
    }
    res.json(remedy);
  } catch (error) {
    console.error("Error fetching remedy:", error);
    res.status(500).json({ error: "Failed to fetch remedy", details: error.message });
  }
};


const getRemediesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const remedies = await Remedy.findAll({ where: { categoryId } });
    res.json(remedies);
  } catch (error) {
    console.error("Error fetching remedies by category:", error);
    res.status(500).json({ error: 'Failed to fetch remedies by category', details: error.message });
  }
};

export {
  getRemedyById,
  getAllRemedies,
  addRemedy,
  updateRemedy,
  deleteRemedy,
  getRemediesByCategory
};
// Get a single remedy by ID

