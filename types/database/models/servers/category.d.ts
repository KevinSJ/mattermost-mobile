// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Query, Relation} from '@nozbe/watermelondb';
import Model, {Associations} from '@nozbe/watermelondb/Model';

/**
 * A Category groups together channels for a user in a team.
 */
export default class CategoryModel extends Model {
    /** table (name) : Category */
    static table: string;

    /** associations : Describes every relationship to this table. */
    static associations: Associations;

    /** display_name : The display name for the category */
    displayName: string;

    /** type : The type of category */
    type: string;

    /** sort_order : The sort order for this category */
    sortOrder: number;

    /** sorting : One of manual, alphabetical, or recent.  */
    sorting: string;

    /** muted : If the category is muted */
    muted: boolean;

    /** collapsed : If the category is collapsed (visible channels) */
    collapsed: boolean;

    /** channels : All the channels associated with this category */
    channels: Query<CategoryChannelModel>;

    /** user_id : The user who created this category */
    userId: string;

    /** user : The user (owner) of this category */
    user: Relation<UserModel>;

    /** team_id : The team in which this category resides */
    teamId: string;

    /** team : The team in which this category resides */
    team: Relation<TeamModel>;
}
