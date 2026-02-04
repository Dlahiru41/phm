export type Route = {
  path: string;
  name: string;
  component: () => Promise<string>;
};

export class Router {
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private rootElement: HTMLElement | null = null;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.init();
  }

  private init(): void {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });

    // Handle link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[data-route]') as HTMLAnchorElement;
      
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route') || link.getAttribute('href');
        if (route) {
          this.navigate(route);
        }
      }
    });

    // Initial route handling
    this.handleRoute();
  }

  public addRoute(route: Route): void {
    this.routes.push(route);
  }

  public addRoutes(routes: Route[]): void {
    this.routes.push(...routes);
  }

  public navigate(path: string): void {
    // Remove leading slash if present for matching
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState({}, '', cleanPath);
    this.handleRoute();
  }

  public async handleRoute(): Promise<void> {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/');

    if (route && this.rootElement) {
      this.currentRoute = route;
      try {
        const html = await route.component();
        this.rootElement.innerHTML = html;
        this.updateActiveLinks();
        this.attachEventListeners();
      } catch (error) {
        console.error('Error loading route:', error);
        if (this.rootElement) {
          this.rootElement.innerHTML = '<div class="p-8 text-center"><h1 class="text-2xl font-bold text-red-500">Error loading page</h1></div>';
        }
      }
    }
  }

  private updateActiveLinks(): void {
    const links = document.querySelectorAll('a[data-route]');
    links.forEach(link => {
      const routePath = link.getAttribute('data-route');
      if (routePath === window.location.pathname) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  private attachEventListeners(): void {
    // Re-attach event listeners for dynamically loaded content
    // Password toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.textContent = type === 'password' ? 'visibility' : 'visibility_off';
      });
    }

    // Form submissions
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
        const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
        const errorDiv = document.getElementById('loginError');
        
        if (!usernameInput || !passwordInput) return;
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Import AuthService dynamically
        const { AuthService } = await import('../services/AuthService');
        
        if (AuthService.login(username, password)) {
          // Hide error if shown
          if (errorDiv) {
            errorDiv.classList.add('hidden');
          }
          
          // Redirect to home page after successful login
          this.navigate('/');
        } else {
          // Show error message
          if (errorDiv) {
            errorDiv.classList.remove('hidden');
          }
          // Clear password field
          passwordInput.value = '';
        }
      });
    }
  }

  public getCurrentRoute(): Route | null {
    return this.currentRoute;
  }
}
