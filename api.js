// API Configuration
const API_BASE_URL = 'https://pocketbase-5i4fn3.chbk.app/api';
const PROJECTS_URL = `${API_BASE_URL}/collections/projects/records`;
const KEY_FEATURES_URL = `${API_BASE_URL}/collections/key_futures/records`;
const PROJECT_GALLERY_URL = `${API_BASE_URL}/collections/project_gallary/records`;
const TECHNOLOGIES_URL = `${API_BASE_URL}/collections/technologies_used/records`;

// API Management Class
class ProjectAPI {
    constructor() {
        this.projects = [];
        this.currentProject = null;
    }

    // Fetch all projects
    async fetchProjects() {
        try {
            const response = await fetch(PROJECTS_URL);
            const data = await response.json();
            this.projects = data.items;
            return this.projects;
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    }

    // Fetch project by ID
    async fetchProjectById(projectId) {
        try {
            const response = await fetch(`${PROJECTS_URL}/${projectId}`);
            const project = await response.json();
            return project;
        } catch (error) {
            console.error('Error fetching project:', error);
            return null;
        }
    }

    // Fetch key features for a project
    async fetchKeyFeatures(projectId) {
        try {
            const response = await fetch(`${KEY_FEATURES_URL}?filter=(project='${projectId}')`);
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching key features:', error);
            return [];
        }
    }

    // Fetch project gallery
    async fetchProjectGallery(projectId) {
        try {
            const response = await fetch(`${PROJECT_GALLERY_URL}?filter=(project='${projectId}')`);
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching project gallery:', error);
            return [];
        }
    }

    // Fetch technologies for a project
    async fetchTechnologies(projectId) {
        try {
            const response = await fetch(`${TECHNOLOGIES_URL}?filter=(project='${projectId}')`);
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching technologies:', error);
            return [];
        }
    }

    // Get image URL from PocketBase
    getImageUrl(collectionId, fileName, projectId = null) {
        if (!fileName) return null;
        if (projectId) {
            return `${API_BASE_URL}/files/${collectionId}/${projectId}/${fileName}`;
        }
        return `${API_BASE_URL}/files/${collectionId}/${fileName}`;
    }

    // Check if project is desktop or mobile
    isDesktopProject(project) {
        // Default to desktop for web development projects
        return project.type === 'Web devlopment' || project.type === 'Web Development';
    }

    // Format project data for display
    formatProjectData(project) {
        return {
            id: project.id,
            title: project.title,
            title_fa: project.title_fa || project.title,
            description: project.description,
            description_fa: project.description_fa || project.description,
            client: project.client,
            client_fa: project.client_fa || project.client,
            duration: project.duration,
            duration_fa: project.duration_fa || project.duration,
            team_size: project.team_size,
            team_size_fa: project.team_size_fa || project.team_size,
            type: project.type,
            type_fa: project.type_fa || project.type,
            year: project.year,
            month: project.month,
            group: project.group,
            rule: project.rule,
            project_overview: project.project_overview,
            project_overview_fa: project.project_overview_fa || project.project_overview,
            isDesktop: this.isDesktopProject(project),
            images: {
                full_page: this.getImageUrl('pbc_484305853', project.full_page, project.id),
                preview: this.getImageUrl('pbc_484305853', project.preview, project.id),
                thumbnail: this.getImageUrl('pbc_484305853', project.thumbnail, project.id)
            }
        };
    }
}

// Global API instance
const projectAPI = new ProjectAPI();

// Export for use in other files
window.ProjectAPI = projectAPI; 