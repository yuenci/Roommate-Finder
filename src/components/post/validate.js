export function validatePost(data) {
    if (data.topic === '') return 'Topic is required';

    let words = data.topic.split(' ');
    for (let word of words) {
        if (word.length > 30) return 'Topic can\'t have words longer than 30 characters';
    }

    if (data.type === '') return 'Type is required';

    if (data.apartment === '') return 'Apartment is required';

    if (data.moveInStart === '' || data.moveInEnd ==="" ) return 'Move in date is required';


    if (data.bedroomNum === '') return 'Bedroom number is required';

    if (data.gender === "") return  'Gender number is required';

    if (data.size === "") return  'Size is required';


    if (data.priceMax ==="" || data.priceMin ==="") return 'Price is invalid';

    if (data.description === "") return  'Description is required';

    if(data.type === true){
        if (data.images.length === 0) return 'Image is required';
    }

    if (data.email === '') return 'Unknown Error caused by email';

    return true;
}