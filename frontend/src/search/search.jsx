import { uid } from 'uid';
import { useParams } from 'react-router-dom';
import Showroom from '../article/showroom'

export function FoundArticles() {
    let { query } = useParams();

    return (
        <Showroom
            key={uid()}
            path={
                '/api/offers/article/findByTags?tags='+query
            }
    />
    )
    }
