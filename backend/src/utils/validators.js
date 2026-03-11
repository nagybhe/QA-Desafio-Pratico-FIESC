const validators = {
    isPositiveInteger(value) {
        return Number.isInteger(value) && value > 0;
    },

    isValidPrice(price) {
        return !isNaN(price) && price >= 0;
    },

    isValidIngredienteTipo(tipo) {
        return ['base', 'adicional'].includes(tipo);
    },

    validateId(id) {
        const num = parseInt(id);
        return this.isPositiveInteger(num) ? num : null;
    }
};

module.exports = validators;