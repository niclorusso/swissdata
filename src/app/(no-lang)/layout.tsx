// Root layout of the addresses without a language (/, /statistics, …). src/proxy.ts normally redirects
// them before this is served; see src/components/LanguageRedirect.tsx.
export default function NoLanguageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
