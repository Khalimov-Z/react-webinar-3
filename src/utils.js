/**
 * Получение формы слова во множественном числе в зависимости от числового значения
 * @param count {Number} Числовое значение для определения формы слова
 * @returns {String} Форма слова во множественном числе
 */
export function getPluralForm(count) {
  const pluralRules = new Intl.PluralRules('ru-RU');

  const forms = {
    one: 'раз',
    few: 'раза',
    many: 'раз',
  };

  const pluralCategory = pluralRules.select(count);

  return forms[pluralCategory];
}