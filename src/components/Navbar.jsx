import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="bg-white shadow p-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-700">NARPA</h1>
      <nav className="space-x-4 text-sm text-gray-700">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/partner">Partner</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}