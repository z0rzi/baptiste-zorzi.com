import React, { Component } from 'react';
// import { Color } from '@app/Core';
import Glider from '@shared/Glider/Glider';
import { ScreenSize } from '@app/Core';

import maltImg from './images/malt.png';
import githubImg from './images/github.png';
import linkedinImg from './images/linkedin.png';
import gmailImg from './images/gmail.png';
import maltImgFat from './images/malt_fat.png';
import githubImgFat from './images/github_fat.png';
import linkedinImgFat from './images/linkedin_fat.png';
import gmailImgFat from './images/gmail_fat.png';

type ContactState = {
    link: string,
    text: string
}
class Contact extends Component<{ [prop: string]: unknown }, ContactState> {

    constructor(props: { [prop: string]: unknown }) {
        super(props);

        this.state = {
            link: '',
            text: ''
        };
    }

    componentDidMount(): void {
        ScreenSize.whenChangeCall(() => {
            this.forceUpdate();
        });
    }

    onChange(payload: ContactState): void {
        this.setState(payload);
    }

    render(): JSX.Element {
        return (
            <>
                <p className="text-title text-center pb-10">
                    Besoin de moi? Voilà où me trouver:
                </p>
                <Glider<ContactState>
                    elems={[
                        {
                            image_active: linkedinImgFat,
                            image: linkedinImg,
                            payload: { link: 'https://linkedin.com/in/baptiste-zorzi', text: 'linkedin.com/in/baptiste-zorzi' }
                        },
                        {
                            image_active: gmailImgFat,
                            image: gmailImg,
                            payload: { link: 'mailto:baptiste.zorzi@protonmail.com', text: 'baptiste.zorzi@protonmail.com' }
                        },
                        {
                            image_active: githubImgFat,
                            image: githubImg,
                            payload: { link: 'https://github.com/z0rzi', text: 'github.com/z0rzi' }
                        },
                        {
                            image_active: maltImgFat,
                            image: maltImg,
                            payload: { link: 'https://www.malt.fr/profile/baptistezorzi', text: 'www.malt.fr/profile/baptistezorzi' }
                        },
                    ]}
                    onChange={this.onChange.bind(this)}
                    shadows={false}
                    spacing={ScreenSize.isMobile() ? 30 : 70}
                    width={ScreenSize.isMobile() ? 100 : 130}
                />
                <div
                    className="py-10 w-full text-center text-gray text-normal font-mono break-all px-3 underline"
                    style={{ minHeight: 140 }}
                >
                    <a href={this.state.link} target="_blank" rel="noreferrer">{this.state.text}</a>
                </div>
            </>
        );
    }
}

export default Contact;
