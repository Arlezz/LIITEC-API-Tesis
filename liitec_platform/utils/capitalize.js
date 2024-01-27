export function capitalizeText(text) {
    // Verificamos si el texto es una cadena no vacía
    if (typeof text !== 'string' || text.length === 0) {
      return text; // Devolvemos el texto sin cambios si no es una cadena válida
    }
  
    // Dividimos el texto en palabras
    const words = text.split(/\s+/);
  
    // Capitalizamos la primera letra de cada palabra
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    // Unimos las palabras capitalizadas de nuevo en una cadena
    return capitalizedWords.join(' ');
  }
