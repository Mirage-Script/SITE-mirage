export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-900">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-primary dark:border-neutral-700 dark:border-t-accent" />
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
          Mirage
        </p>
      </div>
    </div>
  );
}
