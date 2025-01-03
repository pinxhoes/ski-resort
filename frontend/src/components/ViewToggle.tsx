import { List, Map } from "lucide-react";
import { Button } from "./ui/button";

export function ViewToggle({ view, onViewChange }: {
    view: 'map' | 'list',
    onViewChange: (view: 'map' | 'list') => void
}) {
    return (
        <div className="flex gap-2">
            <Button
                variant={view === 'map' ? 'default' : 'outline'}
                onClick={() => onViewChange('map')}
                className="gap-2"
            >
                <Map size={16} /> MAP
            </Button>
            <Button
                variant={view === 'list' ? 'default' : 'outline'}
                onClick={() => onViewChange('list')}
                className="gap-2"
            >
                <List size={16} /> LIST
            </Button>
        </div>
    );
}