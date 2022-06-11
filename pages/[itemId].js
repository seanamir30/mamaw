import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router';

const Item = () => {
    const router = useRouter();
    const {itemId} = router.query;
    return (
        <div>{itemId}</div>
    )
}

export default Item