import { getAllergens, getIngredients, getAllergenFree, getDangerous } from '../../src/2020/day21';
import { foods } from '../../src/2020/data/day21';

let mock;

describe('utility functions', () => {
    beforeEach(() => {
        mock = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`.split('\n');;
    });

    it('should get the allergen list', () => {
        let allergens = getAllergens(mock);
        expect(allergens.get('dairy').has('mxmxvkd')).toBe(true);
        expect(allergens.get('dairy').has('sqjhc')).toBe(false);
        expect(allergens.get('fish').has('mxmxvkd')).toBe(true);
        expect(allergens.get('fish').has('sqjhc')).toBe(true);
        expect(allergens.get('soy').has('sqjhc')).toBe(true);
        expect(allergens.get('soy').has('fvjkl')).toBe(true);
        expect(allergens.get('soy').has('sbzzf')).toBe(false);
    });

    it('should get an ingredient list', () => {
        let ingredients = getIngredients(mock);
        expect(ingredients).toEqual(['mxmxvkd','kfcds','sqjhc','nhms','trh','fvjkl','sbzzf','mxmxvkd','sqjhc','fvjkl','sqjhc','mxmxvkd','sbzzf']);
    });

    it('should get a list of ingredients that aren\'t allergenic', () => {
        let allergens = getAllergens(mock);
        let ingredients = getIngredients(mock);
        let safe = getAllergenFree(allergens, ingredients);
        expect(safe).toEqual(['kfcds','nhms','trh','sbzzf','sbzzf']);
    });

    it('should figure out which ingredients match which allergen', () => {
        let allergens = getAllergens(mock);
        let dangerous = getDangerous(allergens);
        expect(dangerous).toBe('mxmxvkd,sqjhc,fvjkl');
    });
});

describe('solutions', () => {
    it('should find ingredients with no allergens', () => {
        let allergens = getAllergens(foods);
        let ingredients = getIngredients(foods);
        let safe = getAllergenFree(allergens, ingredients);
        expect(safe.length).toBe(2162);
    });

    it('should find the dangerous ingredients', () => {
        let allergens = getAllergens(foods);
        let dangerous = getDangerous(allergens);
        expect(dangerous).toBe('lmzg,cxk,bsqh,bdvmx,cpbzbx,drbm,cfnt,kqprv');
    });
});
