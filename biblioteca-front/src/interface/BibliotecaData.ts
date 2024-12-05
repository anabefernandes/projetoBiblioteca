export interface BibliotecaData {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  imagem: string;
  disponibilidade: boolean;
  clienteEmail?: string;
}
