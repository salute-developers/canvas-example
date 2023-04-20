import { ErrorPage } from '../components/ErrorPage';

const error = {
    status: 'Ошибка 500',
    message: 'Что-то пошло не так, но мы уже разбираемся',
};
function ServerError() {
    return <ErrorPage error={error} />;
}
export default ServerError;
