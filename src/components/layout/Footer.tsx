export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 sm:px-16 border-t border-border text-center">
      <p className="text-secondary text-sm">
        © {new Date().getFullYear()} Mohamed Hegazy. All rights reserved.
      </p>
    </footer>
  );
}
