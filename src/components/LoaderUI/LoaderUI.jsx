import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

function LoaderUI(props){


    return (
        <div style={ {Height:40} }>
            { props.active  === true &&
                <Segment>
                    <Dimmer active  >
                        <Loader indeterminate size='big' inline>Preparing Files</Loader>
                    </Dimmer>
    
                    <Image src='/images/wireframe/short-paragraph.png' />
                </Segment>
            }
            {
                props.active === false && ''
            }
        
      </div>
    )
}

export default LoaderUI;
