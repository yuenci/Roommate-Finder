export function validatePost(data) {
    if (data.topic === '') return 'Topic is required';

    if (data.type === '') return 'Type is required';

    if (data.apartment === '') return 'Apartment is required';

    if (data.moveInRange === '') return 'Move in date is required';

    if (data.moveInRange.length !==2){
        return 'Move in date is invalid';
    }

    if (data.bedroomNum === '') return 'Bedroom number is required';

    if (data.gender === "") return  'Gender number is required';

    if (data.size === "") return  'Size is required';

    if (data.priceRange === "") return  'Price is required';

    if (data.priceRange.length !== 2) return 'Price is invalid';

    if (data.description === "") return  'Description is required';

    if(data.type === true){
        if (data.images.length === 0) return 'Image is required';
    }

    return true;
}