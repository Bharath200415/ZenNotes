import { Plus, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import PropTypes from "prop-types";

function Header({ onNewNote, isDark, onToggleTheme }) {
  return (
    <header className="border-b p-4 bg-card">
      <div className="container mx-auto flex justify-between items-center">
        
        <h1 className="text-2xl font-bold">Zen Notes</h1>

        <div className="flex items-center gap-2">
          <Button onClick={onNewNote} size="sm">
            <Plus className="h-4 w-4 mr-2" /> New Note
          </Button>

          <Button variant="outline" size="icon" onClick={onToggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

      </div>
    </header>
  );
}

Header.propTypes = {
  onNewNote: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};

export default Header;
