import { ErrorPage } from '../components/ErrorPage';

export default function NotFound() {
    return <ErrorPage status="Ошибка 404" message="Что-то пошло не так, но мы уже разбираемся" />;
}
