import { ErrorPage } from '../components/ErrorPage';

export default function ServerError() {
    return <ErrorPage status="Ошибка 500" message="Что-то пошло не так, но мы уже разбираемся" />;
}
