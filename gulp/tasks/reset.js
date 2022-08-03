import { deleteAsync } from 'del';
export const reset = () => {
  return deleteAsync(app.path.clean);
};

// Помилка: SyntaxError: The requested module 'del' does not provide an export named 'default'

// Помилка виникла через оновлення плагіну.

// Виправлення:
// В усіх файлах збірки де підключається плагин замінюємо:

// import del from "del";
// на
// import {deleteAsync} from "del";

// також далі по коду
// del(...якийсь код...)
// на
// deleteAsync(...якийсь код...)
