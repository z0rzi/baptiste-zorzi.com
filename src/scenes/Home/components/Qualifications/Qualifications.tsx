import React, { Component } from 'react';
import Qualification from './components/Qualification/Qualification';
import Title from '@shared/Title/Title';
import { Color } from '@app/Core';

class Qualifications extends Component<{ [prop: string]: unknown }, { [state: string]: unknown }> {

    constructor(props: { [prop: string]: unknown }) {
        super(props);

        this.state = {};
    }

    render(): JSX.Element {
        return (
            <div>
                <Title color={Color.RED}>Diplomes</Title>
                <div className="px-4 md:px-16">
                    <Qualification
                        title="Diplôme d'[ingénieur] en informatique et Systèmes d'informations"
                        school="Université Technologique de Troyes (UTT)"
                        place="Troyes, France"
                        color={Color.GREEN}
                    />
                    <Qualification
                        title="Diplome [Universitaire] Technologique (DUT) en informatique"
                        school="Institut Universitaire Technologique (IUT) Sénart / Fontainebleau"
                        place="Fontainebleau, France"
                        color={Color.RED}
                    />
                    <Qualification
                        title="Baccalauréat Scientifique, Option [Informatique et Science du numérique]"
                        school="Lycée Joliot Curie"
                        place=" Dammarie les lys, France"
                        color={Color.YELLOW}
                    />
                </div>
            </div>
        );
    }
}

export default Qualifications;
