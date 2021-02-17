import React, { useEffect, useState } from 'react'
import ReactJson from 'react-json-view'

function Me() {

    const [me, setMe] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:4433/sessions/whoami`, { credentials: 'include' }).then(r => r.json()).then((data) => {
            setMe(data);
        })
    }, []);

    return (
        <div>
            {
                me ? <ReactJson src={me} style={{ textAlign: "left" }} /> : null
            }
        </div>
    )
}

export default Me
