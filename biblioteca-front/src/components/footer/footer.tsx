import './footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Biblioteca Digital. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
