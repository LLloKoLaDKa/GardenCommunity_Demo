import DefaultImage from '../../wwwroot/img/default.jpg';

export function imageOrDefault(image: string | null) {
    return image ?? DefaultImage;
}