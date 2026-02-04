// This file is no longer needed since we're using TypeScript imports
// Keeping it for backward compatibility but routes should import directly

export class PageLoader {
  static async loadPageContent(pageName: string): Promise<string> {
    // This method is deprecated - use direct TypeScript imports instead
    console.warn('PageLoader.loadPageContent is deprecated. Use direct TypeScript imports.');
    return '<div class="p-8 text-center"><p class="text-red-500">Page loader deprecated - use TypeScript imports</p></div>';
  }

  private static getErrorPage(): string {
    return `
      <div class="p-8 text-center">
        <span class="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
        <h1 class="text-2xl font-bold text-red-500 mb-2">Error loading page</h1>
        <p class="text-[#4c739a] dark:text-slate-400">The requested page could not be loaded.</p>
      </div>
    `;
  }
}
