import React, { useState, useEffect } from "react";
import Loading from "../../../../common/loading";
import '../../../../../css/custom.css';

export default (props) => {
    const [keywords, setKeys] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(true);
    const [chips, setChips] = useState([]);

    useEffect(() => {
        const { course } = props;
        if (course) {
            course.metaKeyword && setChips(course.metaKeyword);
            course.metaDescription && setDesc(course.metaDescription);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [props.course]);

    const handleSave = () => {
        const { course } = props;
        setLoading(true);
        let obj = {};
        if (chips && chips.length > 0) {
            obj['metaKeyword'] = chips;
        }
        if (desc && desc !== "") {
            obj['metaDescription'] = desc;
        }
        props.saveCallback(obj);
    }

    const handleKeyPress = (event) => {
        event.preventDefault();
        setChips(chips.concat(keywords))
        setKeys("")
    }

    const deleteChip = (event, index) => {
        setChips(chips => chips.filter((val, i) => i !== index))
    }

    return <div className="tabdb active" data-tab="#seo">
        {loading && <Loading />}
        <div className="seo-sec">
            <p className="user-label mt-40">Meta Keywords &nbsp; <small>(Optional)</small></p>
            <form onSubmit={handleKeyPress} >
                <input id="chipInput" type="text" className="form-control" placeholder="Keywords" value={keywords}
                    onChange={(e) => setKeys(e.target.value)}
                />
            </form>

            <div className="chip-container">
                {chips && chips.length > 0 && chips.map((val, index) => (
                    <div className="chip-block" key={index}>
                        <span className="chip-text">{val}</span>
                        <span className="chip-icon " onClick={e => deleteChip(e, index)}>x</span>
                    </div>
                ))}
            </div>
            <p className="user-label mt-40">Meta Description &nbsp; <small>(Optional)</small></p>
            <textarea className="form-control" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            <br />
            <br />
            <hr />
            <div className="row padd-020">
                <div className="col-lg-6 col-md-6">
                    <button className="savebtn" onClick={handleSave}>Save</button>
                </div>
                <div className="col-lg-6 col-md-6 text-right">
                    <button className="nxtbtn">Preview</button> &nbsp; &nbsp; <button className="nxtbtn">Publish</button>
                </div>
            </div>
        </div>
    </div>
}