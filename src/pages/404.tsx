import { ErrorPage } from '../components/ErrorPage';

const error = {
    status: 'Ошибка 404',
    message: 'Что-то пошло не так, но мы уже разбираемся',
};
export default function NotFound() {
    return <ErrorPage {...error} />;
}
