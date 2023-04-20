import { ErrorPage } from '../components/ErrorPage';

const error = {
    status: 'Ошибка 404',
    message: 'Что-то пошло не так, но мы уже разбираемся',
};
function NotFound() {
    return <ErrorPage error={error} />;
}
export default NotFound;
