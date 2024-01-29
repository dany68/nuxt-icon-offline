import fs from 'fs';
import path from 'path';

const iconsFolder = './assets/icons'

// Download an icon
async function downloadIcon(iconSet, iconName, outputPath) {
    try {
        const res = await fetch(`https://api.iconify.design/${iconSet}/${iconName}.svg?height=unset`);

        if (! res.ok) {
            throw new Error(`Failed to fetch ${iconSet}:${iconName}. Status: ${res.status}`);
        }

        fs.writeFileSync(
            path.join(outputPath, `${iconSet}:${iconName}.svg`),
            await res.text()
        );

        console.log(`Downloaded: ${iconSet}:${iconName}`);
    } catch (e) {
        console.error(`Failed to download ${iconSet}:${iconName}`, e);
    }
}

/**
 * Delete an icon file
 */
function deleteIcon(iconFilePath) {
    try {
        fs.unlinkSync(iconFilePath);
        console.log(`Deleted: ${path.basename(iconFilePath)}`);
    } catch (error) {
        console.error(`Failed to delete ${iconFilePath}`, error);
    }
}

/**
 * List of the dowloaded icons
 */
function dowloadedIcons(folderPath) {
    try {
        return fs.readdirSync(folderPath).map(file => file.split('.')[0])
    } catch (error) {
        console.error(`Error reading folder ${folderPath}:`, error);
        return [];
    }
}

/**
 * Read the icons.txt file and sync/download icons in $iconsFolder
 */
fs.readFile('icons.txt', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading icons.txt:', err);
        return;
    }

    const dlIcons = dowloadedIcons(iconsFolder)

    // Download icons that are in the list of icons.txt but not yet downloaded
    const iconList = data.trim().split('\n');
    for (const line of iconList) {
        const [iconSet, iconName] = line.split(':');
        if (! dlIcons.includes(`${iconSet}:${iconName}`)) {
            await downloadIcon(iconSet, iconName, iconsFolder); // TODO: Improve with Promise.all
        }
    }

    // Delete files that are not in the list of icons
    for (const file of dlIcons) {
        if (! iconList.includes(file)) {
            deleteIcon(`${iconsFolder}/${file}.svg`);
        }
    }
});