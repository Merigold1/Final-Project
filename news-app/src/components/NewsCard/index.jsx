import { useState } from 'react';
import styles from './newsCard.module.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const truncateChar = (text) => {
    let result = ''
    for (let i = 0; i < text.length; i++) {
        if (i < 150) {
            result += text[i]
        } else {
            break
        }
    }

    return `${result}...`
}

function NewsCard(props) {
    const { headline, abstract, source, author, viewDetails, save, unSave, isSaved, webUrl } = props
    const [popUpOpen, setPopUpOpen] = useState(false)

    return (
        <section className={styles.newsCard}>
            <h3 className={styles.source}>{source}</h3>
            <h4>{headline}</h4>
            <h3 className={styles.author}>{author}</h3>
            <p>{truncateChar(abstract)}</p>
            <div className={styles.buttonContainer}>
                <button
                    type='button'
                    className={styles.newsPageButton}
                    onClick={() => {
                        viewDetails(webUrl)
                    }}

                >News Page</button>
                <button
                    type='button'
                    className={`${isSaved ? styles.unsaveButton : styles.saveButton}`}
                    onClick={() => {
                        if (isSaved) {
                            unSave()
                        } else {
                            save()
                        }
                        setPopUpOpen(true)
                        setTimeout(() => { setPopUpOpen(false) }, 1000)
                    }}> {isSaved ? 'Unsave' : 'Save'}
                </button>
            </div>
            <Popup open={popUpOpen} position="right center" closeOnDocumentClick contentStyle={{
                padding: "10px 20px",
                background: "rgba(50, 50, 50, 0.9)",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
                fontSize: "16px",
            }}>
                <div>{isSaved ? "News Saved" : "News Unsaved"}</div>
            </Popup>
        </section>
    )
}

export { NewsCard }