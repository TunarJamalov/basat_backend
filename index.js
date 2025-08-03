import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Admin credentials
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '2008.111';

// MockAPI URLs
const NAVBAR_API_URL = 'https://686e3c01c9090c495388d05f.mockapi.io/navbar';
const MAIN_API_URL = 'https://688b2af12a52cabb9f506b76.mockapi.io/main';
const PROJECTS_API_URL = 'https://688b2b9b2a52cabb9f506ed4.mockapi.io/projects';
const ABOUT_API_URL = 'https://688b3fca2a52cabb9f50d365.mockapi.io/about';
const CONTACT_API_URL = 'https://688b2cad2a52cabb9f507602.mockapi.io/contact';
const FOOTER_API_URL = 'https://688b2d292a52cabb9f50795f.mockapi.io/footer';
const PROJECTS_SECTION_API_URL = 'https://688b2b9b2a52cabb9f506ed4.mockapi.io/projects/1/section';
const CONTACT_SOCIAL_API_URL = 'https://688b2cad2a52cabb9f507602.mockapi.io/contact/1/social';
const FOOTER_SOCIAL_API_URL = 'https://688b2d292a52cabb9f50795f.mockapi.io/footer/1/social';
const SITE_API_URL = 'https://688b3fca2a52cabb9f50d365.mockapi.io/site';

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: 'Login successful' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Navbar endpoints
app.get('/api/navbar', async (req, res) => {
  try {
    const navbarResponse = await axios.get(NAVBAR_API_URL);
    let navbarData = navbarResponse.data[0]; // Assuming there's only one navbar entry

    if (!navbarData) {
      // If no navbar data, provide a default structure
      navbarData = {
        id: "1", // Default ID
        brandName: 'Basat Games',
        logo: ''
      };
    }
    res.json(navbarData);
  } catch (err) {
    console.error("Failed to fetch navbar data:", err.message);
    res.status(500).json({ error: 'Failed to fetch navbar data' });
  }
});

app.put('/api/navbar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${NAVBAR_API_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error("Failed to update navbar data:", err.message);
    res.status(500).json({ error: 'Failed to update navbar data' });
  }
});

// Main section endpoints
app.get('/api/main', async (req, res) => {
  try {
    const response = await axios.get(MAIN_API_URL);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch main data' });
  }
});

app.put('/api/main/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${MAIN_API_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update main data' });
  }
});

// Projects endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const response = await axios.get(PROJECTS_API_URL);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const response = await axios.post(PROJECTS_API_URL, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${PROJECTS_API_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${PROJECTS_API_URL}/${id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Projects section endpoints - ayrı collection için
app.get('/api/projects/section', async (req, res) => {
  try {
    console.log('Fetching from:', PROJECTS_SECTION_API_URL);
    const response = await axios.get(PROJECTS_SECTION_API_URL);
    console.log('Response data:', response.data);
    if (Array.isArray(response.data) && response.data.length > 0) {
      res.json(response.data);
    } else {
      // Default section data
      res.json([{
        id: "1",
        title: "Our Projects",
        subtitle: "Discover our latest gaming projects and innovations"
      }]);
    }
  } catch (err) {
    console.error("Failed to fetch projects section data:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: 'Failed to fetch projects section data' });
  }
});

app.put('/api/projects/section/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${PROJECTS_SECTION_API_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error("Failed to update projects section data:", err.message);
    res.status(500).json({ error: 'Failed to update projects section data' });
  }
});

// Contact endpoints
app.get('/api/contact', async (req, res) => {
  try {
    console.log('Fetching contact from:', CONTACT_API_URL);
    const contactResponse = await axios.get(CONTACT_API_URL);
    console.log('Contact response data:', contactResponse.data);
    let contactData = contactResponse.data[0]; // Assuming there's only one contact entry

    if (contactData) {
      // Fetch social media associated with this contact
      console.log('Fetching social from:', `${CONTACT_SOCIAL_API_URL}?contactId=${contactData.id}`);
      const socialResponse = await axios.get(`${CONTACT_SOCIAL_API_URL}?contactId=${contactData.id}`);
      console.log('Social response data:', socialResponse.data);
      contactData.socialMedia = socialResponse.data;
    } else {
      // If no contact data, provide a default structure
      contactData = {
        id: "1", // Default ID
        email: 'info@basatgames.com',
        phone: '+90 555 123 4567',
        location: 'Istanbul, Turkey',
        socialMedia: []
      };
    }
    res.json(contactData);
  } catch (err) {
    console.error("Failed to fetch contact data:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: 'Failed to fetch contact data' });
  }
});

app.get('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching contact by ID from:', `${CONTACT_API_URL}/${id}`);
    const contactResponse = await axios.get(`${CONTACT_API_URL}/${id}`);
    console.log('Contact response data:', contactResponse.data);
    let contactData = contactResponse.data;

    if (contactData) {
      // Fetch social media associated with this contact
      console.log('Fetching social from:', `${CONTACT_SOCIAL_API_URL}?contactId=${id}`);
      const socialResponse = await axios.get(`${CONTACT_SOCIAL_API_URL}?contactId=${id}`);
      console.log('Social response data:', socialResponse.data);
      contactData.socialMedia = socialResponse.data;
    } else {
      // If no contact data, provide a default structure
      contactData = {
        id: id,
        email: 'info@basatgames.com',
        phone: '+90 555 123 4567',
        location: 'Istanbul, Turkey',
        socialMedia: []
      };
    }
    res.json(contactData);
  } catch (err) {
    console.error("Failed to fetch contact data by ID:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: 'Failed to fetch contact data' });
  }
});

app.put('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Contact PUT request - ID:', id);
    console.log('Contact PUT request - Body:', req.body);
    
    const { socialMedia, ...contactFields } = req.body; // Separate socialMedia from other contact fields
    console.log('Contact fields to update:', contactFields);
    console.log('Social media to process:', socialMedia);

    // Update main contact fields
    const contactResponse = await axios.put(`${CONTACT_API_URL}/${id}`, contactFields);
    console.log('Contact main fields updated:', contactResponse.data);

    // Handle social media updates
    if (socialMedia && Array.isArray(socialMedia)) {
      console.log('Processing social media updates...');
      
      // First, get existing social media to compare
      const existingSocialResponse = await axios.get(`${CONTACT_SOCIAL_API_URL}?contactId=${id}`);
      const existingSocial = existingSocialResponse.data;
      console.log('Existing social media:', existingSocial);
      
      // Create a map of existing social media by ID
      const existingSocialMap = new Map(existingSocial.map(item => [item.id, item]));
      
      // Process each social media item
      for (const socialItem of socialMedia) {
        console.log('Processing social item:', socialItem);
        if (socialItem.id && existingSocialMap.has(socialItem.id.toString())) {
          // Update existing item
          console.log('Updating existing social item:', socialItem.id);
          await axios.put(`${CONTACT_SOCIAL_API_URL}/${socialItem.id}`, {
            ...socialItem,
            contactId: id
          });
          existingSocialMap.delete(socialItem.id.toString());
        } else {
          // Create new item
          console.log('Creating new social item');
          await axios.post(CONTACT_SOCIAL_API_URL, {
            ...socialItem,
            contactId: id
          });
        }
      }
      
      // Delete remaining items that are no longer in the list
      for (const [itemId] of existingSocialMap) {
        console.log('Deleting social item:', itemId);
        await axios.delete(`${CONTACT_SOCIAL_API_URL}/${itemId}`);
      }
    }

    // Return updated contact data with social media
    const updatedContactResponse = await axios.get(`${CONTACT_API_URL}/${id}`);
    const updatedContact = updatedContactResponse.data;
    
    // Fetch updated social media
    const updatedSocialResponse = await axios.get(`${CONTACT_SOCIAL_API_URL}?contactId=${id}`);
    updatedContact.socialMedia = updatedSocialResponse.data;
    
    console.log('Final contact response:', updatedContact);
    res.json(updatedContact);
  } catch (err) {
    console.error("Failed to update contact data:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: 'Failed to update contact data' });
  }
});

// Specific endpoints for contact social media
app.get('/api/contact/:contactId/social', async (req, res) => {
  try {
    const { contactId } = req.params;
    const response = await axios.get(`${CONTACT_SOCIAL_API_URL}?contactId=${contactId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact social media' });
  }
});

app.post('/api/contact/:contactId/social', async (req, res) => {
  try {
    const { contactId } = req.params;
    const newSocial = { ...req.body, contactId }; // Ensure contactId is set
    const response = await axios.post(CONTACT_SOCIAL_API_URL, newSocial);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add contact social media' });
  }
});

app.put('/api/contact/:contactId/social/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${CONTACT_SOCIAL_API_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact social media' });
  }
});

app.delete('/api/contact/:contactId/social/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${CONTACT_SOCIAL_API_URL}/${id}`);
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact social media' });
  }
});

// About endpoints
app.get('/api/about', async (req, res) => {
  try {
    console.log('Fetching about from:', ABOUT_API_URL);
    const response = await axios.get(ABOUT_API_URL);
    console.log('About response data:', response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Failed to fetch about data:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: 'Failed to fetch about data' });
  }
});

app.put('/api/about/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${ABOUT_API_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error("Failed to update about data:", err.message);
    res.status(500).json({ error: 'Failed to update about data' });
  }
});

// Footer endpoints
app.get('/api/footer', async (req, res) => {
  try {
    console.log('Fetching footer from:', FOOTER_API_URL);
    const footerResponse = await axios.get(FOOTER_API_URL);
    console.log('Footer response data:', footerResponse.data);
    let footerData = footerResponse.data[0]; // Assuming there's only one footer entry

    if (footerData) {
      // Fetch social media associated with this footer
      console.log('Fetching footer social from:', `${FOOTER_SOCIAL_API_URL}?footerId=${footerData.id}`);
      const socialResponse = await axios.get(`${FOOTER_SOCIAL_API_URL}?footerId=${footerData.id}`);
      console.log('Footer social response data:', socialResponse.data);
      footerData.socialMedia = socialResponse.data;
    } else {
      // If no footer data, provide a default structure
      footerData = {
        id: "1", // Default ID
        copyright: '© 2024 Basat Games. All rights reserved.',
        socialMedia: []
      };
    }
    res.json(footerData);
  } catch (err) {
    console.error("Failed to fetch footer data:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: 'Failed to fetch footer data' });
  }
});

app.get('/api/footer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching footer by ID from:', `${FOOTER_API_URL}/${id}`);
    const footerResponse = await axios.get(`${FOOTER_API_URL}/${id}`);
    console.log('Footer response data:', footerResponse.data);
    let footerData = footerResponse.data;

    if (footerData) {
      // Fetch social media associated with this footer
      console.log('Fetching footer social from:', `${FOOTER_SOCIAL_API_URL}?footerId=${id}`);
      const socialResponse = await axios.get(`${FOOTER_SOCIAL_API_URL}?footerId=${id}`);
      console.log('Footer social response data:', socialResponse.data);
      footerData.socialMedia = socialResponse.data;
    } else {
      // If no footer data, provide a default structure
      footerData = {
        id: id,
        copyright: '© 2024 Basat Games. All rights reserved.',
        socialMedia: []
      };
    }
    res.json(footerData);
  } catch (err) {
    console.error("Failed to fetch footer data by ID:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: 'Failed to fetch footer data' });
  }
});

app.put('/api/footer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Footer PUT request - ID:', id);
    console.log('Footer PUT request - Body:', req.body);
    
    const { socialMedia, ...footerFields } = req.body; // Separate socialMedia from other footer fields
    console.log('Footer fields to update:', footerFields);
    console.log('Social media to process:', socialMedia);

    // Update main footer fields
    const footerResponse = await axios.put(`${FOOTER_API_URL}/${id}`, footerFields);
    console.log('Footer main fields updated:', footerResponse.data);

    // Handle social media updates
    if (socialMedia && Array.isArray(socialMedia)) {
      console.log('Processing social media updates...');
      
      // First, get existing social media to compare
      const existingSocialResponse = await axios.get(`${FOOTER_SOCIAL_API_URL}?footerId=${id}`);
      const existingSocial = existingSocialResponse.data;
      console.log('Existing social media:', existingSocial);
      
      // Create a map of existing social media by ID
      const existingSocialMap = new Map(existingSocial.map(item => [item.id, item]));
      
      // Process each social media item
      for (const socialItem of socialMedia) {
        console.log('Processing social item:', socialItem);
        if (socialItem.id && existingSocialMap.has(socialItem.id.toString())) {
          // Update existing item
          console.log('Updating existing social item:', socialItem.id);
          await axios.put(`${FOOTER_SOCIAL_API_URL}/${socialItem.id}`, {
            ...socialItem,
            footerId: id
          });
          existingSocialMap.delete(socialItem.id.toString());
        } else {
          // Create new item
          console.log('Creating new social item');
          await axios.post(FOOTER_SOCIAL_API_URL, {
            ...socialItem,
            footerId: id
          });
        }
      }
      
      // Delete remaining items that are no longer in the list
      for (const [itemId] of existingSocialMap) {
        console.log('Deleting social item:', itemId);
        await axios.delete(`${FOOTER_SOCIAL_API_URL}/${itemId}`);
      }
    }

    // Return updated footer data with social media
    const updatedFooterResponse = await axios.get(`${FOOTER_API_URL}/${id}`);
    const updatedFooter = updatedFooterResponse.data;
    
    // Fetch updated social media
    const updatedSocialResponse = await axios.get(`${FOOTER_SOCIAL_API_URL}?footerId=${id}`);
    updatedFooter.socialMedia = updatedSocialResponse.data;
    
    console.log('Final footer response:', updatedFooter);
    res.json(updatedFooter);
  } catch (err) {
    console.error("Failed to update footer data:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: 'Failed to update footer data' });
  }
});

// Specific endpoints for footer social media
app.get('/api/footer/:footerId/social', async (req, res) => {
  try {
    const { footerId } = req.params;
    const response = await axios.get(`${FOOTER_SOCIAL_API_URL}?footerId=${footerId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch footer social media' });
  }
});

app.post('/api/footer/:footerId/social', async (req, res) => {
  try {
    const { footerId } = req.params;
    const newSocial = { ...req.body, footerId }; // Ensure footerId is set
    const response = await axios.post(FOOTER_SOCIAL_API_URL, newSocial);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add footer social media' });
  }
});

app.put('/api/footer/:footerId/social/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${FOOTER_SOCIAL_API_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update footer social media' });
  }
});

app.delete('/api/footer/:footerId/social/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${FOOTER_SOCIAL_API_URL}/${id}`);
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete footer social media' });
  }
});

// Site endpoints
app.get('/api/site', async (req, res) => {
  try {
    const response = await axios.get(SITE_API_URL);
    console.log('Site data fetched from MockAPI:', response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Failed to fetch site data:", err.message);
    res.status(500).json({ error: 'Failed to fetch site data' });
  }
});

app.put('/api/site/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${SITE_API_URL}/${id}`, req.body);
    console.log('Site data updated in MockAPI:', response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Failed to update site data:", err.message);
    res.status(500).json({ error: 'Failed to update site data' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- POST /api/login');
  console.log('- GET/PUT /api/navbar');
  console.log('- GET/PUT /api/site');
  console.log('- GET/PUT /api/main');
  console.log('- GET/POST/PUT/DELETE /api/projects');
  console.log('- GET/PUT /api/projects/section');
  console.log('- GET/PUT /api/about');
  console.log('- GET/POST/PUT/DELETE /api/contact/:contactId/social/:id?');
  console.log('- GET/POST/PUT/DELETE /api/footer/:footerId/social/:id?');
}); 