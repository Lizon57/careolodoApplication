import { AiOutlineSearch } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"
import styled from "styled-components"
import { Input } from "../ui/input"
import { flexAlignCenterMixin, flexColumnMixin } from "../../styles/mixins/flex-mixins"
import { devicesMinWidth } from "../../styles/media-queries/devices"
import { transitionRegular } from "../../styles/mixins/transition-mixins"


export function FilterAndSort({ filterText, onChangeFilterText, onSetSort, onClearFilterAndSort }: Props) {
    return (
        <StyledCollectionsFilterAndSort>
            <span className="name-filter" title="Filter todo by text">
                <AiOutlineSearch size={20} />
                <Input type="text" placeholder="Search todo" value={filterText} onChange={(ev) => onChangeFilterText(ev)} />
            </span>

            <select className="sort" title="Sort collections" onChange={onSetSort}>
                <option value="text 1">By text (asc)</option>
                <option value="text -1">By text (desc)</option>
                <option value="active 1">By state (active first)</option>
                <option value="active -1">By state (done first)</option>
            </select>

            <span className="clear" title="Clear filter and sort settings" onClick={onClearFilterAndSort}>
                <FaTimes /> Clear
            </span>
        </StyledCollectionsFilterAndSort>
    )
}


const StyledCollectionsFilterAndSort = styled.section`
    ${flexColumnMixin('.5rem')}

    @media ${devicesMinWidth.tablet} {
        flex-direction: row;
        ${flexAlignCenterMixin('.5rem')}
    }

    span.name-filter {
        position: relative;

        input {
            padding: ${({ theme }) => theme.spaceBlockRegularRem} ${({ theme }) => theme.spaceInlinexxxLargeRem} ${({ theme }) => theme.spaceBlockRegularRem};
        }

        input, select{
            width: 100%;

            @media ${devicesMinWidth.tablet} {
                width: 20rem;
            }
        }

        svg {
            position: absolute;
            top: 50%;
            left: .5rem;
            transform: translateY(-50%);
        }
    }

    select.sort {
        align-self: normal;

        border: 1px solid ${({ theme }) => theme.bluePrimary};
        border-radius: 3px;
        background-color: ${({ theme }) => theme.whitePrimary};
        color: ${({ theme }) => theme.bluePrimary};
        font-size: ${({ theme }) => theme.fontSizeSmallRem};
        font-family: ${({ theme }) => theme.typographyEmphasis};
        padding: ${({ theme }) => theme.spaceBlockRegularRem};
    
        &:hover, &:focus-within {
            border-color: ${({ theme }) => theme.purplePrimary};
        }
    }
        
    span.clear {
        ${flexAlignCenterMixin('5px')}

        cursor: pointer;
        color: ${({ theme }) => theme.blackLightest};
        ${transitionRegular()}

        &:hover {
            color: ${({ theme }) => theme.bluePrimary};
        }
    }
`


type Props = {
    filterText: string
    onChangeFilterText: (ev: React.ChangeEvent<HTMLInputElement>) => void
    onSetSort: (ev: React.ChangeEvent<HTMLSelectElement>) => void
    onClearFilterAndSort: () => void
}