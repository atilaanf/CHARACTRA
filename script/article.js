let articlesData = [];
        let filteredArticles = [];

        // Load articles from JSON file
        async function loadArticles() {
            try {
                const response = await fetch('/articles.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                articlesData = await response.json();
                filteredArticles = [...articlesData];
                return articlesData;
            } catch (error) {   
                console.error('Error loading articles:', error);
                showErrorMessage('Failed to load articles. Please check if articles.json file exists.');
                return [];
            }
        }

        // Show error message
        function showErrorMessage(message) {
            const container = document.getElementById('articlesContainer');
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error Loading Articles</h3>
                    <p>${message}</p>
                </div>
            `;
        }



        

        // Render articles
        function renderArticles(articles) {
            const container = document.getElementById('articlesContainer');
            
            if (articles.length === 0) {
                container.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>No articles found</h3>
                        <p>Try adjusting your search terms</p>
                    </div>
                `;
                return;
            }

            const articlesHTML = articles.map(article => `
                <div class="article-card" onclick="showArticleDetail(${article.id})">
                    <div class="article-image-container">
                        <img src="${article.image}" alt="${article.title}" class="article-image">
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">${article.title}</h3>
                        <p class="article-description">${article.description}</p>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `<div class="articles-grid">${articlesHTML}</div>`;
        }

        // Show article detail
        function showArticleDetail(articleId) {
            const article = articlesData.find(a => a.id === articleId);
            if (!article) return;

            document.getElementById('modalTitle').textContent = article.title;
            document.getElementById('modalBody').innerHTML = article.content;

            const modal = document.getElementById('articleModal');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        // Close modal
        function closeModal() {
            const modal = document.getElementById('articleModal');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        // Setup modal
        function setupModal() {
            const modalClose = document.getElementById('modalClose');
            const modal = document.getElementById('articleModal');

            modalClose.addEventListener('click', closeModal);

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        }

        // Search functionality
        function setupSearch() {
            const searchInput = document.getElementById('searchInput');
            
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                filteredArticles = articlesData.filter(article => 
                    article.title.toLowerCase().includes(searchTerm) ||
                    article.description.toLowerCase().includes(searchTerm)
                );
                
                renderArticles(filteredArticles);
            });
        }

        // Initialize the page
        async function init() {
            setupModal();
            
            // Load articles and render
            const articles = await loadArticles();
            
            // Simulate loading
            setTimeout(() => {
                if (articles.length > 0) {
                    renderArticles(articles);
                    setupSearch();
                }
            }, 1000);
        }

        // Start the application
        document.addEventListener('DOMContentLoaded', init);