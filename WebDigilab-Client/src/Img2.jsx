import React from "react";
import { CookiesProvider, useCookies } from 'react-cookie'

import {AdvancedImage} from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Transformation } from '@cloudinary/url-gen';

import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { opacity, brightness } from "@cloudinary/url-gen/actions/adjust";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { png } from "@cloudinary/url-gen/qualifiers/format";
import { focusOn, compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn, face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";

const img = ({uploadedImage}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'darhro5gs'
        }
    });
    
    const myImage = cld.image(uploadedImage);
    myImage.resize(fill().width(50).height(50)).roundCorners(max())

    return (
        <>
            <AdvancedImage cldImg={myImage}/>
        </>
    )
}

export default img;